import { useState, type FC, useEffect } from 'react';
import { hasRefreshToken } from '../../utils/localstorage';
import { useRouter } from 'next/router';
import { CONSTANTS } from '../../constants';
import useSWR from 'swr';
import { fetcher } from '../../utils/fetcher';

type WithPrivatePage = (Component: any) => FC;

const WithPrivatePage: WithPrivatePage = (Component) => {
  const Authenticated: FC = (props: any): JSX.Element | null => {
    const [isHasRefreshToken, setIsHasRefreshToken] = useState(false);
    const { data: userData, error: userError } = useSWR(isHasRefreshToken ? CONSTANTS.api.users : null, fetcher);
    const router = useRouter();

    useEffect(() => {
      const refreshToken = hasRefreshToken();

      if (!refreshToken) {
        router.push(CONSTANTS.redirection.signIn);
      }

      setIsHasRefreshToken(!!refreshToken);
    }, []);

    if (userError) {
      router.push(CONSTANTS.redirection.signIn);
    }

    return (
      <div>
        <Component {...{ ...props, user: userData }} />
      </div>
    );
  };

  return Authenticated;
};

export default WithPrivatePage;
