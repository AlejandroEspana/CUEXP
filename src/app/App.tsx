import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { SECTIONS } from '../data/sections';
import { useEffect } from 'react';
import { usePresentation } from '../hooks/usePresentation';
import {
  Introduction,
  GuidedMedia,
  OsiModel,
  StructuredCabling,
  Connectors,
  T568,
  CableTypes,
  FiberOptics,
  SingleMode,
  MultiMode,
  ODF,
  Muflas,
  Coaxial,
  RG8,
  Heliax,
  BNC,
  Waveguides,
  Wireless,
  SoftwareEngineering,
  Cases,
  Quiz,
  Conclusions
} from '../sections';

const RouteSync = () => {
  const { setCurrentIndex } = usePresentation();
  const location = useLocation();

  useEffect(() => {
    const idx = SECTIONS.findIndex(s => s.path === location.pathname);
    if (idx !== -1) {
      setCurrentIndex(idx);
    }
  }, [location.pathname, setCurrentIndex]);

  return null;
};

const getComponent = (componentName: string) => {
  switch (componentName) {
    case 'Introduction':
      return <Introduction />;
    case 'GuidedMedia':
      return <GuidedMedia />;
    case 'OsiModel':
      return <OsiModel />;
    case 'StructuredCabling':
      return <StructuredCabling />;
    case 'Connectors':
      return <Connectors />;
    case 'T568':
      return <T568 />;
    case 'CableTypes':
      return <CableTypes />;
    case 'FiberOptics':
      return <FiberOptics />;
    case 'SingleMode':
      return <SingleMode />;
    case 'MultiMode':
      return <MultiMode />;
    case 'ODF':
      return <ODF />;
    case 'Muflas':
      return <Muflas />;
    case 'Coaxial':
      return <Coaxial />;
    case 'RG8':
      return <RG8 />;
    case 'Heliax':
      return <Heliax />;
    case 'BNC':
      return <BNC />;
    case 'Waveguides':
      return <Waveguides />;
    case 'Wireless':
      return <Wireless />;
    case 'SoftwareEngineering':
      return <SoftwareEngineering />;
    case 'Cases':
      return <Cases />;
    case 'Quiz':
      return <Quiz />;
    case 'Conclusions':
      return <Conclusions />;
    default:
      return <Introduction />;
  }
};

export const App = () => {
  return (
    <Router>
      <RouteSync />
      <Layout>
        <Routes>
          {SECTIONS.map((section) => (
            <Route 
              key={section.id} 
              path={section.path} 
              element={getComponent(section.component)} 
            />
          ))}
          {/* Fallback route */}
          <Route path="*" element={<Introduction />} />
        </Routes>
      </Layout>
    </Router>
  );
};
