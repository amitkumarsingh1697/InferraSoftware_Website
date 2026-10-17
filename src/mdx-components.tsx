import type { MDXComponents } from "mdx/types";
import Link from "next/link";

/**
 * Global MDX element mapping. Internal links use next/link; external links
 * open safely in a new tab. Styling comes from the .prose-inferra wrapper.
 */
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) => {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
