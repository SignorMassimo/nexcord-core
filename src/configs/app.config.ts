import { registerConfigWait } from '@nexcord/config';
import { NexCord } from '@nexcord/core';

registerConfigWait('initMessage', () => `${NexCord.client.user?.username} active`)
