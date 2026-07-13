import { Listener } from '@nexcord/core';
import type { ButtonInteraction } from 'discord.js';

@Listener()
export class HelloButtonAction {
     execute(i: ButtonInteraction) {
          i.reply({
               content: 'Hello XD',
               flags: 'Ephemeral'
          })
     }
}
