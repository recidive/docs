import React, { useMemo } from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useTOCHighlight,
  useFilteredAndTreeifiedTOC,
} from "@docusaurus/theme-common/internal";
import TOCItemTree from "@theme/TOCItems/Tree";
import HelpImproveDocsButtons from "@site/src/components/FeedbackFooter/HelpImproveDocsButtons";
import WasThisHelpful from "@site/src/components/FeedbackFooter/WasThisHelpful";

export default function TOCItems({
  toc,
  className = "table-of-contents table-of-contents__left-border",
  linkClassName = "table-of-contents__link",
  linkActiveClassName = undefined,
  minHeadingLevel: minHeadingLevelOption,
  maxHeadingLevel: maxHeadingLevelOption,
  ...props
}) {
  const themeConfig = useThemeConfig();
  const minHeadingLevel =
    minHeadingLevelOption ?? themeConfig.tableOfContents.minHeadingLevel;
  const maxHeadingLevel =
    maxHeadingLevelOption ?? themeConfig.tableOfContents.maxHeadingLevel;
  const tocTree = useFilteredAndTreeifiedTOC({
    toc,
    minHeadingLevel,
    maxHeadingLevel,
  });
  const tocHighlightConfig = useMemo(() => {
    if (linkClassName && linkActiveClassName) {
      return {
        linkClassName,
        linkActiveClassName,
        minHeadingLevel,
        maxHeadingLevel,
      };
    }
    return undefined;
  }, [linkClassName, linkActiveClassName, minHeadingLevel, maxHeadingLevel]);
  useTOCHighlight(tocHighlightConfig);
  return (
    <>
      <HelpImproveDocsButtons />
      <hr />
      <TOCItemTree
        toc={tocTree}
        className={className}
        linkClassName={linkClassName}
        {...props}
      />
      <hr />
      <WasThisHelpful />
    </>
  );
}