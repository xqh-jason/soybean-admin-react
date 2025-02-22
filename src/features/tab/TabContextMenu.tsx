import { Dropdown } from 'antd';
import type { MenuProps } from 'antd';

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

  const menu = getMenu(options());

  const dropdownAction: Record<App.Global.DropdownKey, () => void> = {
    closeAll() {
      console.log('closeAll', tabId);
    },
    closeCurrent() {
      console.log('closeCurrent', tabId);
    },
    closeLeft() {
      console.log('closeLeft', tabId);
    },
    closeOther() {
      console.log('closeOther', tabId);
    },
    closeRight() {
      console.log('closeRight', tabId);
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
