import { useFormikContext } from 'formik';
import { SeoSnippet } from './SeoSnippet';
import { PreviewFrame } from './PreviewFrame';
import type { PageFormData } from '../types';

export function LivePreview() {
  const { values } = useFormikContext<PageFormData>();

  const robots = [
    values.seo.robotsIndex ? 'index' : 'noindex',
    values.seo.robotsFollow ? 'follow' : 'nofollow',
  ].join(', ');

  return (
    <div className="space-y-6">
      <SeoSnippet
        title={values.seo.metaTitle || values.title}
        url={`https://hexpertify.com/${values.identifierUrl || '(identifier-url)'}`}
        description={values.seo.metaDescription}
        robots={robots}
        ogTitle={values.seo.openGraphTitle || values.title}
        ogDescription={values.seo.openGraphDescription}
        ogImage={values.seo.openGraphImage}
      />
      <PreviewFrame
        data={{
          title: values.title,
          identifierUrl: values.identifierUrl,
          seo: values.seo,
          chunks: values.chunks,
        }}
      />
    </div>
  );
}
