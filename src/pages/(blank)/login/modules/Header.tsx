import FlipText from '@/components/FilpText';
import SystemLogo from '@/components/SystemLogo';
// import { LangSwitch } from '@/features/lang';
// import { ThemeSchemaSwitch } from '@/features/theme';

const Header = memo(() => {
  return (
    <header className="flex-y-center justify-between">
      <SystemLogo className="h-64px w-64px text-primary lt-sm:h-48px lt-sm:w-48px" />

      <FlipText
        className="text-28px text-primary font-500 lt-sm:text-22px"
        word="SheIn管理系统"
      />

      <div className="i-flex-col">
        {/* <ThemeSchemaSwitch
          className="text-20px lt-sm:text-18px"
          showTooltip={false}
        />
        <LangSwitch showTooltip={false} /> */}
      </div>
    </header>
  );
});

export default Header;
