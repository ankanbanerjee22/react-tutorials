import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dialog from '../../components/Dialog';

global.M = {
    Modal: {
        init: jest.fn(),
        getInstance: jest.fn(() => ({
            open: jest.fn(),
            destroy: jest.fn(),
        })),
    },
};

jest.mock('react-dom', () => {
    const originalModule = jest.requireActual('react-dom');
    return {
        ...originalModule,
        createPortal: (node, container) => node,
    };
});

afterEach(cleanup);

describe('Dialog component', () => {
    it('renders without crashing', () => {
        const {getByText} = render(<Dialog title="Test Dialog" onClose={() => {}} />);
        expect(getByText('Test Dialog')).toBeInTheDocument();
    });

    it('renders children components', () => {
        const {getByText} = render(
            <Dialog title="Test Dialog" onClose={() => {}}>
                <div>Test Content</div>
            </Dialog>
        );
        expect(getByText('Test Content')).toBeInTheDocument();
    });

    it('calls onClose callback when close button is clicked', () => {
        const onCloseMock = jest.fn();
        const {getByText} = render(<Dialog title="Test Dialog" onClose={onCloseMock} />);
        const closeButton = getByText('close');
        closeButton.click();
        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
