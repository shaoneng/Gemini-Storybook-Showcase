import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LanguageSwitcher from '../../components/LanguageSwitcher';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/',
    push: jest.fn(),
  }),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders language switcher with both languages', () => {
    render(<LanguageSwitcher />);
    
    // Check if globe icon is present
    const globeIcon = screen.getByRole('button');
    expect(globeIcon).toBeInTheDocument();
  });

  it('shows language options when clicked', async () => {
    render(<LanguageSwitcher />);
    
    // Click the language switcher button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check if both language options are present
    await waitFor(() => {
      expect(screen.getByText('中文')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });

  it('disables current language option', async () => {
    render(<LanguageSwitcher />);
    
    // Click the language switcher button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check that current language (zh) is disabled
    await waitFor(() => {
      const chineseButton = screen.getByText('中文');
      expect(chineseButton).toBeDisabled();
      
      const englishButton = screen.getByText('English');
      expect(englishButton).not.toBeDisabled();
    });
  });

  it('shows checkmark for current language', async () => {
    render(<LanguageSwitcher />);
    
    // Click the language switcher button
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    // Check that checkmark is shown for current language
    await waitFor(() => {
      const checkmark = screen.getByText('✓');
      expect(checkmark).toBeInTheDocument();
    });
  });
});