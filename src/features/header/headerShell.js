import { HeaderContainer, Header, HeaderMenuButton, HeaderName, HeaderNavigation, HeaderMenuItem, HeaderGlobalBar, HeaderGlobalAction, SideNav, SideNavMenu, SideNavItems, SideNavMenuItem} from "@carbon/react";
import { Search, Notification, Apps, CircleStroke } from "@carbon/react/icons";
import Main from "../../components/main/main";

const HeaderShell = () => (
  <HeaderContainer
    render={({ isSideNavExpanded, onClickSideNavExpand }) => (
      <>
        <Header aria-label="React project name" className="header">
          <HeaderMenuButton className="burger" aria-label="Open menu" isCollapsible onClick={onClickSideNavExpand} isActive={isSideNavExpanded}/>
          <HeaderName className="header__name" href="#" prefix="Notes">TestProject</HeaderName>
          <HeaderNavigation aria-label="React project" className="nav">
            <HeaderMenuItem href="#cards" isCurrentPage>Link 1</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
            <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Search" className="header__btn">
              <Search id="search"/>
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="Notifications" className="header__btn">
              <Notification id="notification"/>
            </HeaderGlobalAction>
            <HeaderGlobalAction aria-label="App Switcher" tooltipAlignment="end" className="header__btn">
              <Apps id="apps"/>
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav className="side" id="side" aria-label="Side navigation" isRail expanded={isSideNavExpanded} onOverlayClick={onClickSideNavExpand}>
            <SideNavItems className="side__items">
              <SideNavMenu className="side__item" renderIcon={CircleStroke} title="Category title">
                <SideNavMenuItem className="side__link">Link</SideNavMenuItem>
                <SideNavMenuItem aria-current="page" className="side__link">Link</SideNavMenuItem>
                <SideNavMenuItem className="side__link">Link</SideNavMenuItem>
              </SideNavMenu>
            </SideNavItems>
          </SideNav>
        </Header>
        <Main />
      </>
    )}
  />
);

export default HeaderShell;
