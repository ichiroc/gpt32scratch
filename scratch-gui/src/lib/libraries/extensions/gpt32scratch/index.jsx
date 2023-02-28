import React from 'react';
import { FormattedMessage } from 'react-intl';
import gpt32scratchIconURL from './gpt32scratch.png';
import gpt32scratchInsetIconURL from './gpt32scratch-small.png';

const translationMap = {
  'ja': {
    'gui.extension.gpt32scratch.description': 'OpenAI の GPT-3 からの返答を得る。'
  },
  'ja-Hira': {
    'gui.extension.gpt32scratch.description': 'OpenAI の GPT-3 からのへんとうをえる。'
  }
};

const entry = {
  name: 'Gpt32Scratch',
  extensionId: 'gpt32scratch',
  extensionURL: 'https://ichiroc.github.io/gpt32scratch.mjs',
  collaborator: 'ichiroc',
  iconURL: gpt32scratchIconURL,
  insetIconURL: gpt32scratchInsetIconURL,
  description: (
    <FormattedMessage
      defaultMessage="GPT32Scratch Blocks."
      description="Description for GPT32Scratch Blocks"
      id="gui.extension.gpt32scratch.description"
    />
  ),
  featured: true,
  disabled: false,
  bluetoothRequired: false,
  internetConnectionRequired: true,
  helpLink: 'https://github.com/ichiroc/gpt32scratch/',
  translationMap: translationMap
}

export { entry }; // loadable-extension needs this line.
export default entry;
