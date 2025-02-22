import { useEmit } from '@sa/hooks';
import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

import { TabEvent } from './tabEnum';

interface ContextMenuProps {
  active: boolean;
  children: React.ReactNode;
  darkMode: boolean;
  disabledKeys?: App.Global.DropdownKey[];
  excludeKeys?: App.Global.DropdownKey[];
  mode: UnionKey.ThemeTabMode;
  tabId: string;
}

interface DropdownOption {
  disabled?: boolean;
  icon: string;
  key: App.Global.DropdownKey;
  label: string;
}

function getMenu(options: DropdownOption[]) {
  const items: MenuProps['items'] = options.map(opt => ({
    disabled: opt.disabled,
    icon: (
      <SvgIcon
        className="text-icon"
        icon={opt.icon}
      />
    ),
    key: opt.key,
    label: opt.label
  }));

  return items;
}

const ContextMenu = ({ children, disabledKeys = [], excludeKeys = [], tabId }: ContextMenuProps) => {
  const { t } = useTranslation();

  const options = () => {
    const opts: DropdownOption[] = [
      {
        icon: 'ant-design:close-outlined',
        key: 'closeCurrent',
        label: t('dropdown.closeCurrent')
      },
      {
        icon: 'ant-design:column-width-outlined',
        key: 'closeOther',
        label: t('dropdown.closeOther')
      },
      {
        icon: 'mdi:format-horizontal-align-left',
        key: 'closeLeft',
        label: t('dropdown.closeLeft')
      },
      {
        icon: 'mdi:format-horizontal-align-right',
        key: 'closeRight',
        label: t('dropdown.closeRight')
      },
      {
        icon: 'ant-design:line-outlined',
        key: 'closeAll',
        label: t('dropdown.closeAll')
      }
    ];

    return opts
      .filter(opt => !excludeKeys.includes(opt.key))
      .map(opt => {
        if (disabledKeys.includes(opt.key)) {
          opt.disabled = true;
        }
        return opt;
      });
  };

  const emit = useEmit();

  const menu = getMenu(options());

  const dropdownAction: Record<App.Global.DropdownKey, () => void> = {
    closeAll() {
      emit(TabEvent.UPDATE_TABS, TabEvent.CLOSE_ALL);
    },
    closeCurrent() {
      emit(TabEvent.UPDATE_TABS, TabEvent.CLOSE_CURRENT, tabId);
    },
    closeLeft() {
      emit(TabEvent.UPDATE_TABS, TabEvent.CLEAR_LEFT_TABS, tabId);
    },
    closeOther() {
      emit(TabEvent.UPDATE_TABS, TabEvent.CLOSE_OTHER, tabId);
    },
    closeRight() {
      emit(TabEvent.UPDATE_TABS, TabEvent.CLEAR_RIGHT_TABS, tabId);
    }
  };

  const handleClick: MenuProps['onClick'] = e => {
    dropdownAction[e.key as App.Global.DropdownKey]();
  };

  return (
    <Dropdown
      menu={{ items: menu, onClick: handleClick }}
      trigger={['contextMenu']}
    >
      {children}
    </Dropdown>
  );
};

export default ContextMenu;
