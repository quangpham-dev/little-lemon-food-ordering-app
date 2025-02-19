import { Box } from '@/components/ui/Box'
import { Flex } from '@/components/ui/Flex'
import { Image } from '@/components/ui/Image'
import { ThemedText } from '@/components/ThemedText'
import { Images } from '@/assets'
import { Searchbar } from '@/components/Searchbar'
import RenderWith from '@/components/render-with'

interface HeroProps {
  type?: 'primary' | 'secondary'
  onSearch?: (text: string) => void
}
export function Hero({ type = 'primary', onSearch }: HeroProps) {
  const handleSearchChange = (text: string) => {
    onSearch?.(text)
  }

  return (
    <Box backgroundColor="#495E57" padding={16}>
      <ThemedText type="H1">Little Lemon</ThemedText>

      <Flex
        direction="row"
        justify="between"
        align="center"
        style={{ gap: 10 }}>
        <Flex style={{ flex: 1, gap: 20 }}>
          <ThemedText type="title">Chicago</ThemedText>
          <ThemedText type="subtitle">
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </ThemedText>
        </Flex>

        <Image
          variant="rounded"
          source={Images.restaurantFood}
          resizeMode="cover"
          style={{ width: 150, height: 150 }}
          accessible
          accessibilityLabel="Restaurant food"
        />
      </Flex>

      <RenderWith isTrue={type === 'primary'}>
        <Searchbar placeholder="Search" onChangeText={handleSearchChange} />
      </RenderWith>
    </Box>
  )
}
