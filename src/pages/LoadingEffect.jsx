import React from 'react';

export function LoadingEffect() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
        <h3>Loading...&nbsp;&nbsp;&nbsp;</h3>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
