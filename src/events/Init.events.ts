import { Listener, On, type DcEvents } from '@nexcord/core'
import { HelloButton } from '../components/components'

@Listener()
class InitEvents {
    @On('messageCreate')
    async hello(...[message]: DcEvents<'messageCreate'>) {
        if (message.content != 'hello') return
        message.reply({
            content: 'hello!',
            components: [HelloButton({ userId: message.author.id })]
        })
    }
}
