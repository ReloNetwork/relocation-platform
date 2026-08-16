import GlobalNavigationFixed from './GlobalNavigationFixed';
import EditorialFooter from './editorial/EditorialFooter';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GlobalNavigationFixed />
      {children}
      <EditorialFooter />
    </>
  );
}
