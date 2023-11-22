export const styles: any = {
  sectionsContainer: `
    flex
    justify-between
    md:justify-end
    items-center
    bg-white-100
    z-50
    md:h-[4.375rem]
    overflow-y-hidden
  `,
  mblSelector: `
    basis-2/5
    text-sm
  `,
  mblOptionBox: `
    !border-0
    !text-black-100
    !w-fit
    !pr-[1.875rem]
    !pl-5
    capitalize
  `,
  inquireBtn: `
    underline
    !text-sm
    !px-5
    !text-black-100
    transition-text-decoration
    duration-300    
    ease-in
    underline-offset-[0.375rem]
    decoration-1
    hover:underline
    focus:underline
    decoration-black-40
    hover:decoration-black-60
    hover:bg-transparent
    active:bg-transparent
    focus:bg-transparent
    focus:decoration-black-60
  `,
  listWrapper: `
    relative
    flex
    flex-1
    justify-start
    md:justify-end
    overflow-y-hidden
  `,
  listDesktop: `
    flex
    overflow-x-auto
    pr-2.5

    after:content-['_']
    after:bg-gradient-to-l
    after:from-white-100
    after:to-transparent
    after:absolute
    after:right-0
    after:bottom-0
    after:w-5
    after:h-full
  `,
  mblStickyUp: `
    motion-safe:animate-slowTop
    transition
    
  `,
  sticky: `
    top-0
    sticky
    -mx-5
  `,
  listItem: `
    text-sm
    p-4
    capitalize
    cursor-pointer
    transition-text-decoration
    duration-300
    ease-in
    underline-offset-[0.375rem]
    decoration-1
    decoration-transparent
    hover:underline
    hover:decoration-current
    focus:underline
    focus:decoration-current
    decoration-black-60
    whitespace-nowrap
    active:text-black-100
  `,
  mblList: `
    !left-2.5
    !mt-0
    min-w-fit
    capitalize
  `,
  mblElem: `
    text-sm
  `,
  activeLink: `
    text-black-100
  `,
  grayLink: `
    text-black-60
    hover:text-black-100
    active:text-black-100
  `,
  none: `h-80`,
  divider: `
    mr-2.5
    my-0
    h-5
    inline-block
    bg-black-40
  `,
};
