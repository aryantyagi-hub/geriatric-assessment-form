
import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Container,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import {
  assessmentSchema,
  MOBILITY,
  type Assessment,
} from './assessmentSchema';

type FormValues = {
  mrn: string;
  patientName: string;
  dateOfBirth: string;
  assessmentDate: string;
  mobility: (typeof MOBILITY)[number] | '';
  barthelIndex: number;
  medicationCount: number;
  pharmacistReviewRequested: boolean;
  followUpDate: string;
  consentObtained: boolean;
};

const samplePatient: FormValues = {
  mrn: 'MRN-004821',
  patientName: 'Sushila Deshpande',
  dateOfBirth: '1949-03-12',
  assessmentDate: '2026-08-07',
  mobility: 'cane',
  barthelIndex: 80,
  medicationCount: 3,
  pharmacistReviewRequested: false,
  followUpDate: '2026-09-04',
  consentObtained: true,
};

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const initialValues: FormValues = {
  mrn: '',
  patientName: '',
  dateOfBirth: '',
  assessmentDate: '',
  mobility: '',
  barthelIndex: Number.NaN,
  medicationCount: Number.NaN,
  pharmacistReviewRequested: false,
  followUpDate: '',
  consentObtained: false,
};

type Props = {
  onSave?: (data: Assessment) => void;
};

export default function App({ onSave }: Props) {
  const [saving, setSaving] = useState(false);
  const [savedData, setSavedData] = useState<Assessment | null>(null);

  const form = useForm<FormValues>({
    mode: 'controlled',
    initialValues,
    validate: schemaResolver(assessmentSchema, { sync: true }),
    validateInputOnBlur: true,
  });

  const handleSample = () => {
    form.setValues(samplePatient);
    form.clearErrors();
    setSavedData(null);
  };

  const handleSubmit = async (values: FormValues) => {
    setSaving(true);
    setSavedData(null);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const result = assessmentSchema.safeParse(values);

    if (result.success) {
      setSavedData(result.data);
      onSave?.(result.data);
    }

    setSaving(false);
  };

  const dateProps = {
    valueFormat: 'YYYY-MM-DD',
    clearable: true,
    popoverProps: { withinPortal: true },
  };

  return (
    <Container size="sm" py={40}>
      <Stack gap="lg">
        <div>
          <Text size="sm" c="dimmed" fw={600}>
            PATIENT CARE
          </Text>
          <Title order={1} mt={4}>
            Geriatric Care Assessment
          </Title>
          <Text c="dimmed" mt={6}>
            Complete the assessment details for the patient.
          </Text>
        </div>

        <Paper withBorder shadow="sm" radius="lg" p="xl">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <Title order={3}>Patient Information</Title>

              <TextInput
                label="Medical Record Number"
                placeholder="MRN-004821"
                required
                {...form.getInputProps('mrn')}
              />

              <TextInput
                label="Patient Name"
                placeholder="Enter patient's full name"
                required
                {...form.getInputProps('patientName')}
              />

              <DateInput
                label="Date of Birth"
                placeholder="Select date of birth"
                required
                maxDate={new Date()}
                {...dateProps}
                value={form.values.dateOfBirth || null}
                onChange={(value) =>
                  form.setFieldValue('dateOfBirth', value ?? '')
                }
                error={form.errors.dateOfBirth}
              />

              <DateInput
                label="Assessment Date"
                placeholder="Select assessment date"
                required
                maxDate={new Date()}
                {...dateProps}
                value={form.values.assessmentDate || null}
                onChange={(value) =>
                  form.setFieldValue('assessmentDate', value ?? '')
                }
                error={form.errors.assessmentDate}
              />

              <Title order={3} mt="md">
                Clinical Assessment
              </Title>

              <Select
                label="Mobility Status"
                placeholder="Select mobility status"
                required
                data={mobilityOptions}
                {...form.getInputProps('mobility')}
              />

              <NumberInput
                label="Barthel Index"
                description="Score from 0 to 100, in steps of 5"
                placeholder="Enter score"
                required
                min={0}
                max={100}
                step={5}
                value={
                  Number.isNaN(form.values.barthelIndex)
                    ? ''
                    : form.values.barthelIndex
                }
                onChange={(value) =>
                  form.setFieldValue(
                    'barthelIndex',
                    typeof value === 'number' ? value : Number.NaN
                  )
                }
                error={form.errors.barthelIndex}
              />

              <NumberInput
                label="Number of Regular Medications"
                placeholder="Enter medication count"
                required
                min={0}
                max={30}
                value={
                  Number.isNaN(form.values.medicationCount)
                    ? ''
                    : form.values.medicationCount
                }
                onChange={(value) =>
                  form.setFieldValue(
                    'medicationCount',
                    typeof value === 'number' ? value : Number.NaN
                  )
                }
                error={form.errors.medicationCount}
              />

              <Checkbox
                label="Pharmacist review requested"
                checked={form.values.pharmacistReviewRequested}
                onChange={(event) =>
                  form.setFieldValue(
                    'pharmacistReviewRequested',
                    event.currentTarget.checked
                  )
                }
                error={form.errors.pharmacistReviewRequested}
              />

              <Title order={3} mt="md">
                Follow-up and Consent
              </Title>

              <DateInput
                label="Next Review Date"
                placeholder="Select follow-up date"
                required
                {...dateProps}
                value={form.values.followUpDate || null}
                onChange={(value) =>
                  form.setFieldValue('followUpDate', value ?? '')
                }
                error={form.errors.followUpDate}
              />

              <Checkbox
                label="Patient or representative has given consent"
                checked={form.values.consentObtained}
                onChange={(event) =>
                  form.setFieldValue(
                    'consentObtained',
                    event.currentTarget.checked
                  )
                }
                error={form.errors.consentObtained}
              />

              <Group justify="space-between" mt="lg">
                <Button
                  type="button"
                  variant="default"
                  onClick={handleSample}
                  disabled={saving}
                >
                  Load sample patient
                </Button>

                <Button type="submit" loading={saving}>
                  Save assessment
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        {savedData && (
          <Alert color="green" title="Assessment saved successfully">
            <Text size="sm" mb="xs">
              The validated assessment data is:
            </Text>
            <Code block>{JSON.stringify(savedData, null, 2)}</Code>
          </Alert>
        )}
      </Stack>
    </Container>
  );
}
