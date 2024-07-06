type MaybePromise<T> = () => T | Promise<T>

interface CronConfig {
  second?: number
  minute?: number
  hour?: number
  repeat?: boolean
}

interface Job {
  key: string
  cron: CronConfig
  task: MaybePromise<void>
}

interface JobList {
  [key: string]: Job
}

interface JobInstances {
  [key: string]: NodeJS.Timeout
}

class JobManager {
  private jobs: JobList = {}
  private jobInstances: JobInstances = {}

  public addJob(job: Job): void {
    if (this.jobs[job.key])
      this.removeJob(job.key)

    this.jobs[job.key] = job
    this.startJob(job.key)
  }

  public removeJob(key: string): void {
    this.stopJob(key)
    delete this.jobs[key]
  }

  public getJobs(): JobList {
    return this.jobs
  }

  public startJob(key: string) {
    const job = this.jobs[key]
    if (!job)
      throw new Error('Job not found')

    const { cron, task } = job
    const { hour, minute, repeat, second } = cron

    let timeInterval = 0
    if (second)
      timeInterval = second * 1000
    if (minute)
      timeInterval = minute * 60 * 1000
    if (hour)
      timeInterval = hour * 60 * 60 * 1000

    const jobInstance = setInterval(async () => {
      await task()
      if (!repeat)
        this.removeJob(key)
    }, timeInterval)

    this.jobInstances[key] = jobInstance
  }

  public stopJob(key: string) {
    if (this.jobInstances[key]) {
      clearInterval(this.jobInstances[key])
      delete this.jobInstances[key]
    }
  }
}

export const jobManager = new JobManager()
