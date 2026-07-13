import { Service } from '@nexcord/core';

@Service()
export class TestService {
    test() {
        return '[TEST SERVICE] -'
    }
}
