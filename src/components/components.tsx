import { DiscordJSX } from '@nexcord/tsx'
import { HelloButtonAction } from '../common/actions/HelloButton.action'

export const HelloButton = ({userId}: {userId: string}) => {
    return (
        <row>
            <button id={userId} label='Hello!' action={[HelloButtonAction]}/>
        </row>
    )
}
