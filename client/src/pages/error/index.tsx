import RoutePath from '@/routers/path';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const nav = useNavigate();

  return (
    <div>
      error
      <Button
        onClick={() => {
          nav(RoutePath.MAIN);
        }}
      >
        回首页
      </Button>
    </div>
  );
};

export default ErrorPage;
