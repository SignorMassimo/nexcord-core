import { Service } from '@nexcord/core';
import { TestService } from './Test.service';

@Service()
export class LoggerService {
    constructor(private readonly testService: TestService) { }
    log(...args: any[]) {
        console.log(this.testService.test(), ...args)
    }
}
