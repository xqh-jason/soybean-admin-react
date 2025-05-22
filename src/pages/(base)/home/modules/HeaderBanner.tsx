import { selectUserInfo } from '@/features/auth/authStore';

const HeaderBanner = () => {
  const { t } = useTranslation();

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
            <div className="pl-12px">
              <h3 className="text-18px font-semibold">{t('page.home.greeting', { userName: userInfo.name })}</h3>
              <p className="text-#999 leading-30px" />
            </div>
          </div>
        </ACol>
      </ARow>
    </ACard>
  );
};

export default HeaderBanner;
