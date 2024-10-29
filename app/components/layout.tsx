// layout.tsx
// import Head from 'next/head';

// const Layout = ({ children, title }) => {
//   return (
//     <>
//       <Head>
//         <title>{title || 'Default Title'}</title>
//       </Head>
//       <main>{children}</main>
//     </>
//   );
// };

// export default Layout;


// app/components/layout.tsx
import Head from 'next/head';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode; // Specify that children can be any valid React node
  title?: string; // Title is optional
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Default Title'}</title>
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
