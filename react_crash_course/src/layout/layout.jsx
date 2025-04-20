import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';

export default function layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
