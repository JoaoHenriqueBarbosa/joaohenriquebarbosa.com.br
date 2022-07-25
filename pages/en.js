import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import i18n from '../utils/i18n';

const En = () => {

  const { push } = useRouter();

  useEffect(() => {
    i18n.changeLanguage('en');
    push('/');
  }, []);

  return (
    <div>loading...</div>
  )
}

export default En