import React, {Suspense} from 'react';


interface Props {
  children: React.ReactNode
}
const Layout = ({children}: Props) => {
  return (
    <Suspense fallback={<h1>loading..</h1>}>
      {children}
    </Suspense>
  );
};

export default Layout;
