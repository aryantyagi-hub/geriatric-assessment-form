
import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MantineProvider } from '@mantine/core';
import App from './App';

describe('Geriatric Care Assessment Form', () => {
  it('loads sample patient and submits validated data', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();

    render(
      <MantineProvider>
        <App onSave={onSave} />
      </MantineProvider>
    );

    await user.click(
      screen.getByRole('button', { name: /load sample patient/i })
    );

    await user.click(
      screen.getByRole('button', { name: /save assessment/i })
    );

    await waitFor(() => {
      expect(onSave).toHaveBeenCalledTimes(1);
    });

    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({
        mrn: 'MRN-004821',
        patientName: 'Sushila Deshpande',
        mobility: 'cane',
        barthelIndex: 80,
        medicationCount: 3,
        consentObtained: true,
      })
    );

    expect(
      await screen.findByText('Assessment saved successfully')
    ).toBeTruthy();
  });
});
