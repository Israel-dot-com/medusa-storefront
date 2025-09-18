import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

// Store dropdown items - will be filled with Medusa categories later
const StoreDropdownItems = [
  { name: "All Products", href: "/store" },
  { name: "Categories", href: "/store/categories" },
  { name: "Collections", href: "/store/collections" },
]

const StoreDropdown = () => {
  return (
    <div className="relative group h-full flex items-center">
      <LocalizedClientLink
        href="/store"
        className="hover:text-ui-fg-base transition-colors px-4 py-2 flex items-center gap-1"
      >
        Store
        <svg 
          className="w-4 h-4 transition-transform group-hover:rotate-180" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </LocalizedClientLink>
      
      {/* Dropdown */}
      <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-ui-border-base shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {StoreDropdownItems.map((item) => (
            <LocalizedClientLink
              key={item.name}
              href={item.href}
              className="block px-4 py-2 text-sm hover:bg-ui-bg-subtle transition-colors"
            >
              {item.name}
            </LocalizedClientLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <>
      {/* Top Banner */}
      <div className="bg-ui-bg-base text-ui-fg-on-color text-center py-2 text-sm">
        Free Shipping on Orders Over $450
      </div>
      
      {/* Main Navigation */}
      <div className="sticky top-0 inset-x-0 z-50 group">
        <header className="relative h-16 mx-auto duration-200 bg-white border-b border-ui-border-base">
          <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
            
            {/* Left Side - Mobile Menu / Desktop Store Dropdown */}
            <div className="flex items-center h-full">
              {/* Mobile Menu */}
              <div className="block lg:hidden h-full">
                <SideMenu regions={regions} />
              </div>
              
              {/* Desktop Store Dropdown */}
              <div className="hidden lg:flex items-center h-full">
                <StoreDropdown />
              </div>
            </div>

            {/* Center - Logo */}
            <div className="flex items-center h-full absolute left-1/2 transform -translate-x-1/2">
              <LocalizedClientLink
                href="/"
                className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase font-bold"
                data-testid="nav-store-link"
              >
                Medusa Store
              </LocalizedClientLink>
            </div>

            {/* Right Side - Country, Search, Account, Cart */}
            <div className="flex items-center gap-x-4 h-full">
              {/* Country Selector - Desktop Only */}
              <div className="hidden lg:block">
                <select className="bg-transparent border-none text-sm hover:text-ui-fg-base focus:outline-none cursor-pointer">
                  <option>Canada</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                </select>
              </div>
              
              {/* Search Icon */}
              <button className="hover:text-ui-fg-base transition-colors p-2" data-testid="nav-search-button">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Account - Desktop Only */}
              <div className="hidden lg:block">
                <LocalizedClientLink
                  className="hover:text-ui-fg-base transition-colors"
                  href="/account"
                  data-testid="nav-account-link"
                >
                  Account
                </LocalizedClientLink>
              </div>
              
              {/* Cart */}
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="hover:text-ui-fg-base transition-colors"
                    href="/cart"
                    data-testid="nav-cart-link"
                  >
                    Cart (0)
                  </LocalizedClientLink>
                }
              >
                <CartButton />
              </Suspense>
            </div>
          </nav>
        </header>
      </div>
    </>
  )
}