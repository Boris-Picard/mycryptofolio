import React from 'react';
import ErrorPage from '@/Pages/Error';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);
    const location = useLocation();
    useEffect(() => {
        if (hasError) {
            setHasError(false);
        }
    }, [location.key]);
    return (
        <ErrorBoundaryInner
            hasError={hasError}
            setHasError={setHasError}
        >
            {children}
        </ErrorBoundaryInner>
    );
}

class ErrorBoundaryInner extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidUpdate(prevProps, previousState) {
        if (!this.props.hasError && prevProps.hasError) {
            this.setState({ hasError: false });
        }
    }

    componentDidCatch(error, errorInfo) {
        this.props.setHasError(true);
    }

    render() {
        return this.state.hasError
            ? <ErrorPage />
            : this.props.children;
    }
}

export default ErrorBoundary;
