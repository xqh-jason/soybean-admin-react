import { Image } from 'antd';
import { Outlet } from 'react-router-dom';

import Header from './modules/Header';

const LoginLayout = () => {
  return (
    <div
      className="relative size-full flex-center flex-col overflow-hidden bg-layout"
      style={{ backgroundColor: '#f1f2f6' }}
    >
      <Image
        height={135}
        preview={false}
        src="http://www.jetcloud.vip/imgs/logoblack.png"
        width={400}
      />
      <div className="mt-5">
        <ACard
          className="relative z-4 w-auto rd-12px"
          variant="borderless"
        >
          <div className="w-400px lt-sm:w-300px">
            <Header />
            <main className="pt-24px">
              <Outlet />
            </main>
          </div>
        </ACard>
      </div>
    </div>
  );
};

export default LoginLayout;
