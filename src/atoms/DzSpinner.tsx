import React from 'react';

const styles = {
  container: `
    flex
    h-[calc(100vh-16.8125rem)]
    md:h-[calc(100vh-10rem)]
    w-full
    items-center
    justify-center
  `,
  loader: `
    relative
    my-1
    flex
    w-full
    max-w-[8rem]
    items-center
    justify-center
    before:content-['']
    before:absolute
    before:rounded-full
    before:animate-puls-in
    before:drop-shadow-[(0_0_1rem_rgba(232,232,232,0.25))]
    before:w-full
    before:pb-[100%]
    before:shadow-[inset_0_0_0_1rem_#f5f5f5]
    after:content-['']
    after:absolute
    after:rounded-full
    after:animate-puls-out
    after:drop-shadow-[(0_0_1rem_rgba(232,232,232,0.25))]
    after:w-[calc(100%-2rem)]
    after:shadow-[0_0_0_0_#f5f5f5]
    after:pb-[calc(100%-2rem)]
  `,
};
export const DzSpinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default DzSpinner;
