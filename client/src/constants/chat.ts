// enum - enum label

import { ConstItem } from '@/types/common';

enum ChatType {
  STREAM,
  SQL,
  STEP
}

declare namespace ChatConstant {
  export type ChatTypeEnum = ChatType;
}

class ChatConstant {
  public static readonly ChatType = ChatType;

  public static TypeList() {
    let result: ConstItem[] = [];
    let key;
    let name;
    for (key in ChatType) {
      let data: ConstItem = {
        checked: false
      };
      name = this.ChatTypeToString(ChatType[key]);
      if (name) {
        data.name = name;
        data.value = name;
        data.type = ChatType[key];
        data.key = ChatType[key];
        result.push(data);
      }
    }
    return result;
  }

  public static ChatTypeToString(type: ChatType | string): string {
    let result = '';
    switch (type) {
      case ChatType.STREAM:
        result = '未开始';
        break;
      case ChatType.SQL:
        result = '进行中';
        break;
      case ChatType.STEP:
        result = '已结束';
        break;
      default:
        break;
    }
    return result;
  }
}

export { ChatConstant };
