"use client"

import { ArrowRightMini, XMark } from "@medusajs/icons"
import { Text, clx, useToggleState } from "@medusajs/ui"
import { useState } from "react"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CountrySelect from "../country-select"
import { HttpTypes } from "@medusajs/types"

const SideMenuItems = {
  Home: "/",
  Store: "/store",
  Account: "/account",
  Cart: "/cart",
}

const SideMenu = ({ regions }: { regions: HttpTypes.StoreRegion[] | null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleState = useToggleState()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Menu Button */}
      <div className="h-full flex items-center">
        <button
          data-testid="nav-menu-button"
          className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
          onClick={toggleMenu}
        >
          <div className="flex flex-col space-y-1">
            <span 
              className={clx(
                "block h-0.5 w-6 bg-current transition-transform duration-300",
                isOpen ? "rotate-45 translate-y-1.5" : ""
              )}
            />
            <span 
              className={clx(
                "block h-0.5 w-6 bg-current transition-opacity duration-300",
                isOpen ? "opacity-0" : ""
              )}
            />
            <span 
              className={clx(
                "block h-0.5 w-6 bg-current transition-transform duration-300",
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              )}
            />
          </div>
        </button>
      </div>

      {/* Overlay */}
      <div
        className={clx(
          "fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeMenu}
      />

      {/* Sliding Menu */}
      <div
        data-testid="nav-menu-popup"
        className={clx(
          "fixed top-0 left-0 h-full w-80 max-w-[80vw] bg-[rgba(3,7,18,0.95)] backdrop-blur-xl z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6 text-ui-fg-on-color">
          {/* Close Button - positioned same as open button */}
          <div className="flex justify-start mb-8" id="xmark">
            <button 
              data-testid="close-menu-button" 
              onClick={closeMenu}
              className="p-2 hover:bg-white hover:bg-opacity-10 rounded-full transition-colors"
            >
              <XMark className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1">
            <ul className="flex flex-col gap-6 items-start justify-start">
              {Object.entries(SideMenuItems).map(([name, href]) => {
                return (
                  <li key={name} className="w-full">
                    <LocalizedClientLink
                      href={href}
                      className="text-2xl leading-10 hover:text-ui-fg-disabled transition-colors block py-2"
                      onClick={closeMenu}
                      data-testid={`${name.toLowerCase()}-link`}
                    >
                      {name}
                    </LocalizedClientLink>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Footer Section */}
          <div className="flex flex-col gap-y-6 mt-8">
            <div
              className="flex justify-between items-center"
              onMouseEnter={toggleState.open}
              onMouseLeave={toggleState.close}
            >
              {regions && (
                <CountrySelect
                  toggleState={toggleState}
                  regions={regions}
                />
              )}
              <ArrowRightMini
                className={clx(
                  "transition-transform duration-150",
                  toggleState.state ? "-rotate-90" : ""
                )}
              />
            </div>
            <Text className="text-xs opacity-75">
              © {new Date().getFullYear()} Medusa Store. All rights reserved.
            </Text>
          </div>
        </div>
      </div>
    </>
  )
}

export default SideMenu