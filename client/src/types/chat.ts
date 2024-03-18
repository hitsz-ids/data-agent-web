// type interface

import { ChatConstant } from '@/constants/chat';

export interface IChatList {
  id: number;
  name: string;
  type: ChatConstant.ChatTypeEnum;
}

export interface IChatInfo {
  name: string;
  age: number;
}
