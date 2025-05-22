import { Image } from 'antd';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

type Props = Omit<LinkProps, 'to'>;
const GlobalLogo: FC<Props> = memo(({ className, ...props }) => {
  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden bg-[#2b2f3a]', className)}
      to="/"
      {...props}
    >
      <Image
        alt="logo"
        height={35}
        preview={false}
        src="http://www.jetcloud.vip/imgs/logowhite.png"
        width={150}
      />
    </Link>
  );
});

export default GlobalLogo;
