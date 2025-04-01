import avatar from '@/assets/imgs/soybean.jpg';
import { selectUserInfo } from '@/features/auth/authStore';

const HeaderBanner = () => {
  const userInfo = useAppSelector(selectUserInfo);

  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <ARow gutter={[16, 16]}>
        <ACol
          md={18}
          span={24}
        >
          <div className="flex-y-center">
            <div className="size-72px shrink-0 overflow-hidden rd-1/2">
              <img
                className="size-full"
                src={avatar}
              />
            </div>
            <div className="pl-12px">
              <h3 className="text-18px font-semibold">{`欢迎，${userInfo?.name}`}</h3>
            </div>
          </div>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default HeaderBanner;
