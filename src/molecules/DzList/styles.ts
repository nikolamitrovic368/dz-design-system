export const styles: any = {
  column: `
    flex
    flex-col
    gap-5
    md:gap-0
  `,
  menuList: `
    md:hidden
    flex
    max-w-full
    overflow-x-auto
    scrollbar
    scrollbar-none
    sticky
    bg-white-100
    z-40
  `,
  activeItem: `
    after:bg-black-60
    text-black-100
    hover:text-black-100
    hover:after:rounded-lg
    cursor-pointer
    hover:after:bg-black-60
    underline
    underline-offset-4
  `,
  defaultItem: `
    text-black-60
    after:bg-black-20
    hover:text-black-100
    hover:after:rounded-lg
    cursor-pointer
    hover:after:bg-black-60
  `,
  listItem: `
    text-xs
    text-left
    min-w-[2.5438rem]
    pb-5
    relative
    outline-0
    md:outline-transparent
  `,
  listLink: `
    md:my-2.5
  `,
  menu: `
    relative
    w-full
    flex
    flex-col
    gap-10
  `,
  disable: `
    cursor-default
    text-black-40
    after:bg-black-20
  `,
  linkDesktop: `
    md:text-black-100    
    md:py-[0.6875rem]
  `,
};
