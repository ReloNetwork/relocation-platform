import GlobalNavigationFixed from './GlobalNavigationFixed';
import EditorialFooter from './editorial/EditorialFooter';
import PublicExperienceLayer from './editorial/PublicExperienceLayer';
export default function Layout({
  children,
  className = '',
  showFooter = true,
}: {
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}) {
  return (
    <>
      <GlobalNavigationFixed />
      <div className={className}>{children}</div>
      <PublicExperienceLayer />
      {showFooter && <EditorialFooter />}
    </>
  );
}
