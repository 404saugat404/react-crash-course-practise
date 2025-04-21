import React from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import SearchForm from '../component/searchform';

export default function Layout({ children, onSearch }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="p-4 flex justify-end">
        <SearchForm onSearch={onSearch} />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
