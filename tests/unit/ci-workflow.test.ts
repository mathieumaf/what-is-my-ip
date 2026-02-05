import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import yaml from 'yaml'

interface WorkflowStep {
  name?: string
  uses?: string
  run?: string
  if?: string
  with?: Record<string, unknown>
}

interface WorkflowJob {
  name?: string
  'runs-on'?: string
  needs?: string | string[]
  if?: string
  steps: WorkflowStep[]
}

interface WorkflowConfig {
  name: string
  on: {
    push: { branches: string[] }
    pull_request: { branches: string[] }
  }
  jobs: Record<string, WorkflowJob>
}

describe('CI/CD Workflow Configuration', () => {
  const workflowPath = join(process.cwd(), '.github', 'workflows', 'ci.yml')
  const lighthousePath = join(process.cwd(), 'lighthouserc.json')

  describe('GitHub Actions Workflow File', () => {
    it('should exist at .github/workflows/ci.yml', () => {
      expect(existsSync(workflowPath)).toBe(true)
    })

    it('should be valid YAML', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      expect(() => yaml.parse(content)).not.toThrow()
    })

    it('should have correct workflow name', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      expect(config.name).toBe('CI/CD Pipeline')
    })

    it('should trigger on push to main branch', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      expect(config.on.push.branches).toContain('main')
    })

    it('should trigger on pull requests to main branch', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      expect(config.on.pull_request.branches).toContain('main')
    })

    it('should have all required jobs', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      const expectedJobs = [
        'lint',
        'typecheck',
        'test-unit',
        'test-e2e',
        'build',
        'lighthouse',
        'deploy',
      ]
      expectedJobs.forEach(job => {
        expect(config.jobs).toHaveProperty(job)
      })
    })

    it('should use ubuntu-latest runner for all jobs', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      Object.values(config.jobs).forEach((job: WorkflowJob) => {
        expect(job['runs-on']).toBe('ubuntu-latest')
      })
    })

    it('should use actions/checkout@v4 in all jobs', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      Object.values(config.jobs).forEach((job: WorkflowJob) => {
        const checkoutStep = job.steps.find((step: WorkflowStep) =>
          step.uses?.includes('actions/checkout')
        )
        expect(checkoutStep?.uses).toBe('actions/checkout@v4')
      })
    })

    it('should use oven-sh/setup-bun@v1 in all jobs except deploy', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      Object.entries(config.jobs).forEach(([jobName, job]: [string, WorkflowJob]) => {
        if (jobName === 'deploy') return // Deploy job uses Vercel action directly
        const bunSetupStep = job.steps.find((step: WorkflowStep) =>
          step.uses?.includes('setup-bun')
        )
        expect(bunSetupStep?.uses).toBe('oven-sh/setup-bun@v1')
      })
    })
  })

  describe('Lint Job', () => {
    it('should run ESLint', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const lintJob = config.jobs.lint
      const eslintStep = lintJob.steps.find((step: WorkflowStep) => step.run?.includes('lint'))
      expect(eslintStep?.run).toBe('bun run lint')
    })

    it('should run Prettier check', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const lintJob = config.jobs.lint
      const prettierStep = lintJob.steps.find((step: WorkflowStep) =>
        step.run?.includes('format:check')
      )
      expect(prettierStep?.run).toBe('bun run format:check')
    })
  })

  describe('TypeCheck Job', () => {
    it('should run TypeScript compiler', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const typecheckJob = config.jobs.typecheck
      const typecheckStep = typecheckJob.steps.find((step: WorkflowStep) =>
        step.run?.includes('typecheck')
      )
      expect(typecheckStep?.run).toBe('bun run typecheck')
    })
  })

  describe('Unit Test Job', () => {
    it('should run Vitest with coverage', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const testJob = config.jobs['test-unit']
      const testStep = testJob.steps.find((step: WorkflowStep) =>
        step.run?.includes('test:unit:coverage')
      )
      expect(testStep?.run).toBe('bun run test:unit:coverage')
    })

    it('should upload coverage to Codecov', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const testJob = config.jobs['test-unit']
      const codecovStep = testJob.steps.find((step: WorkflowStep) => step.uses?.includes('codecov'))
      expect(codecovStep?.uses).toBe('codecov/codecov-action@v4')
      expect(codecovStep?.with?.files).toBe('./coverage/coverage-final.json')
    })
  })

  describe('E2E Test Job', () => {
    it('should install Playwright browsers with deps', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const e2eJob = config.jobs['test-e2e']
      const playwrightInstallStep = e2eJob.steps.find((step: WorkflowStep) =>
        step.run?.includes('playwright install')
      )
      expect(playwrightInstallStep?.run).toBe('bunx playwright install --with-deps')
    })

    it('should build before running tests', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const e2eJob = config.jobs['test-e2e']
      const buildStep = e2eJob.steps.find((step: WorkflowStep) => step.run === 'bun run build')
      expect(buildStep).toBeDefined()
    })

    it('should run E2E tests', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const e2eJob = config.jobs['test-e2e']
      const testStep = e2eJob.steps.find((step: WorkflowStep) => step.run?.includes('test:e2e'))
      expect(testStep?.run).toBe('bun run test:e2e')
    })

    it('should upload Playwright report with if: always()', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const e2eJob = config.jobs['test-e2e']
      const uploadStep = e2eJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('upload-artifact')
      )
      expect(uploadStep?.uses).toBe('actions/upload-artifact@v4')
      expect(uploadStep?.if).toBe('always()')
      expect(uploadStep?.with?.name).toBe('playwright-report')
    })
  })

  describe('Build Job', () => {
    it('should run production build', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const buildJob = config.jobs.build
      const buildStep = buildJob.steps.find((step: WorkflowStep) => step.run === 'bun run build')
      expect(buildStep).toBeDefined()
    })

    it('should analyze bundle sizes', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const buildJob = config.jobs.build
      const analyzeStep = buildJob.steps.find((step: WorkflowStep) =>
        step.run?.includes('analyze:bundle')
      )
      expect(analyzeStep?.run).toBe('bun run analyze:bundle')
    })
  })

  describe('Lighthouse Job', () => {
    it('should depend on build job', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      const lighthouseJob = config.jobs.lighthouse
      expect(lighthouseJob.needs).toContain('build')
    })

    it('should use Lighthouse CI action', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const lighthouseJob = config.jobs.lighthouse
      const lighthouseStep = lighthouseJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('lighthouse-ci')
      )
      expect(lighthouseStep?.uses).toBe('treosh/lighthouse-ci-action@v10')
    })

    it('should reference lighthouserc.json config', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const lighthouseJob = config.jobs.lighthouse
      const lighthouseStep = lighthouseJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('lighthouse-ci')
      )
      expect(lighthouseStep?.with?.configPath).toBe('./lighthouserc.json')
    })

    it('should upload artifacts', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const lighthouseJob = config.jobs.lighthouse
      const lighthouseStep = lighthouseJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('lighthouse-ci')
      )
      expect(lighthouseStep?.with?.uploadArtifacts).toBe(false)
    })
  })

  describe('Deploy Job', () => {
    it('should depend on all other jobs', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      const deployJob = config.jobs.deploy
      const expectedDeps = ['lint', 'typecheck', 'test-unit', 'test-e2e', 'build', 'lighthouse']
      expect(deployJob.needs).toEqual(expect.arrayContaining(expectedDeps))
    })

    it('should only run on main branch push', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content)
      const deployJob = config.jobs.deploy
      expect(deployJob.if).toContain("github.ref == 'refs/heads/main'")
      expect(deployJob.if).toContain("github.event_name == 'push'")
    })

    it('should use Vercel action', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const deployJob = config.jobs.deploy
      const vercelStep = deployJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('vercel-action')
      )
      expect(vercelStep?.uses).toBe('amondnet/vercel-action@v25')
    })

    it('should use GitHub Secrets for Vercel', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const deployJob = config.jobs.deploy
      const vercelStep = deployJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('vercel-action')
      )
      expect(vercelStep?.with?.['vercel-token']).toContain('secrets.VERCEL_TOKEN')
      expect(vercelStep?.with?.['vercel-org-id']).toContain('secrets.VERCEL_ORG_ID')
      expect(vercelStep?.with?.['vercel-project-id']).toContain('secrets.VERCEL_PROJECT_ID')
    })

    it('should deploy to production', () => {
      const content = readFileSync(workflowPath, 'utf-8')
      const config = yaml.parse(content) as WorkflowConfig
      const deployJob = config.jobs.deploy
      const vercelStep = deployJob.steps.find((step: WorkflowStep) =>
        step.uses?.includes('vercel-action')
      )
      expect(vercelStep?.with?.['vercel-args']).toBe('--prod')
    })
  })

  describe('Lighthouse Configuration File', () => {
    it('should exist at project root', () => {
      expect(existsSync(lighthousePath)).toBe(true)
    })

    it('should be valid JSON', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      expect(() => JSON.parse(content)).not.toThrow()
    })

    it('should configure 3 runs', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      expect(config.ci.collect.numberOfRuns).toBe(3)
    })

    it('should use desktop preset', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      expect(config.ci.collect.settings.preset).toBe('desktop')
    })

    it('should have performance assertion with minScore 0.9', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      const perfAssertion = config.ci.assert.assertions['categories:performance']
      expect(perfAssertion).toEqual(['error', { minScore: 0.9 }])
    })

    it('should have accessibility assertion with minScore 1.0', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      const a11yAssertion = config.ci.assert.assertions['categories:accessibility']
      expect(a11yAssertion).toEqual(['error', { minScore: 1.0 }])
    })

    it('should have best-practices assertion with minScore 0.9', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      const bpAssertion = config.ci.assert.assertions['categories:best-practices']
      expect(bpAssertion).toEqual(['error', { minScore: 0.9 }])
    })

    it('should have SEO assertion with minScore 0.9', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      const seoAssertion = config.ci.assert.assertions['categories:seo']
      expect(seoAssertion).toEqual(['error', { minScore: 0.9 }])
    })

    it('should upload to temporary-public-storage', () => {
      const content = readFileSync(lighthousePath, 'utf-8')
      const config = JSON.parse(content)
      expect(config.ci.upload.target).toBe('temporary-public-storage')
    })
  })

  describe('Package.json Scripts', () => {
    it('should have analyze:bundle script', () => {
      const packageJsonPath = join(process.cwd(), 'package.json')
      const content = readFileSync(packageJsonPath, 'utf-8')
      const packageJson = JSON.parse(content)
      expect(packageJson.scripts).toHaveProperty('analyze:bundle')
    })
  })
})
