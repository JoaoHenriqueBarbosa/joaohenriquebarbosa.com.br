import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ children, ...rest }) => {

  const router = useRouter();

  return (
    <Link {...rest}>
      <a className={router.pathname === rest.href ? "active" : ""}>
        {children}
      </a>
    </Link>
  )
}

export default NavLink;