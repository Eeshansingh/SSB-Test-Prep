import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// TAT Imports
import TATModeSelection from './pages/tests/TAT/ModeSelection';
import TATFullTest from './pages/tests/TAT/TATTest';
import TATPracticeTest from './pages/tests/TAT/PracticeTest';

// SRT Imports
import SRTModeSelection from './pages/tests/SRT/ModeSelection';
import SRTFullTest from './pages/tests/SRT/FullTest';
import SRTPracticeTest from './pages/tests/SRT/PracticeTest';

// WAT Imports
import WATModeSelection from './pages/tests/WAT/ModeSelection';
import WATFullTest from './pages/tests/WAT/FullTest';
import WATPracticeTest from './pages/tests/WAT/PracticeTest';

// Simple components for now
const Home = () => <div>Welcome to SSB Prep</div>;
const Dashboard = () => <div>Dashboard</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* TAT Routes */}
          <Route path="tests/tat" element={<TATModeSelection />} />
          <Route path="tests/tat/full" element={<TATFullTest />} />
          <Route path="tests/tat/practice" element={<TATPracticeTest />} />
          
          {/* SRT Routes */}
          <Route path="tests/srt" element={<SRTModeSelection />} />
          <Route path="tests/srt/full" element={<SRTFullTest />} />
          <Route path="tests/srt/practice" element={<SRTPracticeTest />} />
          
          {/* WAT Routes */}
          <Route path="tests/wat" element={<WATModeSelection />} />
          <Route path="tests/wat/full" element={<WATFullTest />} />
          <Route path="tests/wat/practice" element={<WATPracticeTest />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;