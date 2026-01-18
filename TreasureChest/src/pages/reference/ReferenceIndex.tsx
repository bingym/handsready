import { useNavigate } from 'react-router-dom';
import { referenceData } from '@/data/referenceData';

export const ReferenceIndex = () => {
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    if (url.startsWith('/') && !url.startsWith('http')) {
      e.preventDefault();
      navigate(url);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Reference</h1>
        <p className="text-gray-600">Development reference resources and documentation links</p>
      </div>

      <div className="space-y-12">
        {referenceData.map((group, groupIndex) => (
          <section key={groupIndex}>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              {group.Name}
            </h2>
            {group.Data.map((subGroup, subGroupIndex) => (
              <div key={subGroupIndex} className="mb-8 last:mb-0">
                <h3 className="text-lg font-medium mb-3 text-gray-800">
                  {subGroup.Name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {subGroup.Links.map((link, linkIndex) => {
                    const isInternal = link.URL.startsWith('/') && !link.URL.startsWith('http');
                    return (
                      <a
                        key={linkIndex}
                        href={link.URL}
                        onClick={(e) => handleLinkClick(e, link.URL)}
                        target={isInternal ? undefined : '_blank'}
                        rel={isInternal ? undefined : 'noopener noreferrer'}
                        className="block px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      >
                        {link.Title}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};
