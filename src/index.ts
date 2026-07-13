import { ConfigService, NexCord } from '@nexcord/core'
import { LoggerService } from './services/Logger.service'
NexCord.run(process.env.TOKEN!, {
    factory: (loggerService: LoggerService, configService: ConfigService) => {
        loggerService.log(configService.get('initMessage'))
    },
    inject: [LoggerService, ConfigService]
})
