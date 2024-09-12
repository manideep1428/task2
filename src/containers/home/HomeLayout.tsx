import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  Box,
  Grid,
} from "@chakra-ui/react";
import React, { useState } from "react";
import InterviewSettingsForm from "./InterviewSettingsForm";
import JobDetailsForm from "./JobDetailsForm";
import RequisitionDetailsForm from "./RequisitionDetailsForm";
import DisplayCard from "./PreviewCard";

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [completedTabs, setCompletedTabs] = useState([true]); // First tab is initially completed

  const NextTab = () => {
    setCompletedTabs((prev) => {
      const newCompletedTabs = [...prev];
      if (activeTab < newCompletedTabs.length) {
        newCompletedTabs[activeTab] = true;
      }
      return newCompletedTabs;
    });
    setActiveTab((prevTab) => prevTab + 1);
  };

  const PrevTab = () => {
    setActiveTab((prevTab) => prevTab - 1);
  };

  return (
    <Box w="100%">
      <Container maxW="1200px">
        <Heading fontFamily="Poppins" fontSize="1.5rem" my="2rem">
          Create Candidate Requisition
        </Heading>
        <Tabs
          isLazy
          index={activeTab}
          onChange={(index) => {
            setActiveTab(index);
            if (index > activeTab) {
              setCompletedTabs((prev) => {
                const newCompletedTabs = [...prev];
                for (let i = activeTab; i <= index; i++) {
                  newCompletedTabs[i] = true;
                }
                return newCompletedTabs;
              });
            }
          }}
        >
          <TabList>
            <Tab isDisabled={false}>Requisition Details</Tab>
            <Tab isDisabled={activeTab < 1 && !completedTabs[1]}>Job Details</Tab>
            <Tab isDisabled={activeTab < 2 && !completedTabs[2]}>Interview Settings</Tab>
          </TabList>
          <Grid display="grid" gridTemplateColumns="3fr 2fr" gap="24px">
            <TabPanels>
              <TabPanel>
                <RequisitionDetailsForm onNext={NextTab} />
              </TabPanel>
              <TabPanel>
                <JobDetailsForm onPrev={PrevTab} onNext={NextTab} />
              </TabPanel>
              <TabPanel>
                <InterviewSettingsForm onPrev={PrevTab} onNext={NextTab} />
              </TabPanel>
            </TabPanels>
            <DisplayCard />
          </Grid>
        </Tabs>
      </Container>
    </Box>
  );
};

export default HomeLayout;
