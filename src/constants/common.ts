import { transformRecordToOption } from '@/utils/common';

export const yesOrNoRecord: Record<CommonType.YesOrNo, App.I18n.I18nKey> = {
  N: 'common.yesOrNo.no',
  Y: 'common.yesOrNo.yes'
};

export const yesOrNoOptions = transformRecordToOption(yesOrNoRecord);

export const DARK_CLASS = 'dark';

export const ATG_MAP: Record<string, string> = {
  1: 'success',
  2: 'warning'
};

export const YesOrNo_Map: Record<CommonType.YesOrNo, string> = {
  N: 'default',
  Y: 'error'
};

export const LAYOUT_MODE_VERTICAL: UnionKey.ThemeLayoutMode = 'vertical';
export const LAYOUT_MODE_HORIZONTAL: UnionKey.ThemeLayoutMode = 'horizontal';
export const LAYOUT_MODE_VERTICAL_MIX: UnionKey.ThemeLayoutMode = 'vertical-mix';
export const LAYOUT_MODE_HORIZONTAL_MIX: UnionKey.ThemeLayoutMode = 'horizontal-mix';
