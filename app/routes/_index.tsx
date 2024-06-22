import type {MetaFunction} from '@remix-run/node'
import {
  Button,
  ToggleButton,
  makeStyles,
  Label,
  tokens,
  Checkbox,
  Input,
  shorthands,
  Title2,
  Subtitle2
} from '@fluentui/react-components'
import {
  bundleIcon,
  CalendarMonthFilled,
  CalendarMonthRegular
} from '@fluentui/react-icons'

export const meta: MetaFunction = () => {
  return [
    {title: 'New Remix App'},
    {name: 'description', content: 'Welcome to Remix!'}
  ]
}

const CalendarMonth = bundleIcon(CalendarMonthFilled, CalendarMonthRegular)

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    ...shorthands.margin(tokens.spacingHorizontalM)
  },
  section: {
    ...shorthands.margin(tokens.spacingHorizontalM)
  },
  wrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content'
  },
  shipAction: {
    ...shorthands.margin(0, 0, 0, tokens.spacingHorizontalS)
  }
})

export default function Index() {
  const styles = useStyles()

  return (
    <div className={styles.content}>
      <Title2>Welcome to Remix!</Title2>
      <Subtitle2>Everything works, Fluent UI v9 works fine</Subtitle2>
      <div className={styles.section}>
        <div className={styles.wrapper}>
          <ToggleButton icon={<CalendarMonthRegular />}>Default</ToggleButton>
          <ToggleButton appearance="primary" icon={<CalendarMonth />}>
            Primary
          </ToggleButton>
          <ToggleButton appearance="outline" icon={<CalendarMonth />}>
            Outline
          </ToggleButton>
          <ToggleButton appearance="subtle" icon={<CalendarMonth />}>
            Subtle
          </ToggleButton>
          <ToggleButton appearance="transparent" icon={<CalendarMonth />}>
            Transparent
          </ToggleButton>
        </div>
      </div>
      <div className={styles.section}>
        <Label id="Shipping Instructions">Shipping Instructions</Label>
        <div>
          <Input placeholder="Shipping memo" />
        </div>
      </div>
      <div className={styles.section}>
        <Checkbox label="International Shipping" />
      </div>
      <Button className={styles.shipAction} appearance="primary">
        Ship Order
      </Button>
    </div>
  )
}
