import React from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import {
  Public,
  Category,
  School,
  Spellcheck,
  Textsms,
  Notes,
} from "@mui/icons-material";
import LanguagesManagement from "./LanguagesManagement";
import DomainsManagement from "./DomainsManagement";
import LessonsManagement from "./LessonsManagement";
import WordsManagement from "./WordsManagement";
import SentencesManagement from "./SentencesManagement";
import ParagraphsManagement from "./ParagraphsManagement";

interface ContentManagementProps {
  contentTab: string;
  onContentTabChange: (tab: string) => void;
}

const ContentManagement: React.FC<ContentManagementProps> = ({
  contentTab,
  onContentTabChange,
}) => {
  const contentTabs = [
    { id: "languages", label: "Languages", icon: <Public /> },
    { id: "domains", label: "Domains", icon: <Category /> },
    { id: "lessons", label: "Lessons", icon: <School /> },
    { id: "words", label: "Words", icon: <Spellcheck /> },
    { id: "sentences", label: "Sentences", icon: <Textsms /> },
    { id: "paragraphs", label: "Paragraphs", icon: <Notes /> },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Content Management
      </Typography>
      {/* <Typography variant="body1" paragraph color="text.secondary">
        Manage the hierarchical content structure: Languages → Domains → Lessons
        → Words
      </Typography> */}

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={contentTab}
          onChange={(_, newValue) => onContentTabChange(newValue)}
          aria-label="content management tabs"
        >
          {contentTabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              icon={tab.icon}
              iconPosition="start"
              sx={{ textTransform: "none", fontWeight: 500 }}
            />
          ))}
        </Tabs>
      </Box>

      {contentTab === "languages" && <LanguagesManagement />}
      {contentTab === "domains" && <DomainsManagement />}
      {contentTab === "lessons" && <LessonsManagement />}
      {contentTab === "words" && <WordsManagement />}
      {contentTab === "sentences" && <SentencesManagement />}
      {contentTab === "paragraphs" && <ParagraphsManagement />}
    </Box>
  );
};

export default ContentManagement;
