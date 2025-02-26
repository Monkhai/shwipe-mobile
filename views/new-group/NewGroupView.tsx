import UIText from '@/components/ui/UIText'
import { PrimaryButton } from '@/components/ui/buttons/TextButtons'
import { colors } from '@/constants/colors'
import { useCreateNewGroup } from '@/queries/groups/useCreateNewGroup'
import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { BlurView } from 'expo-blur'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Keyboard, Platform, Pressable, StyleSheet, TextInput, useColorScheme, View, ViewStyle } from 'react-native'

interface NewGroupForm {
  groupName: string
}

export default function NewGroupView() {
  const theme = useColorScheme() ?? 'light'

  // Android specific styles
  const androidStyle: ViewStyle = {
    flex: 1,
    gap: 20,
    padding: 20,
    borderRadius: 32,
    backgroundColor: colors[theme].elevatedBackground,
  }

  if (Platform.OS === 'android') {
    return (
      <View style={androidStyle}>
        <Content />
      </View>
    )
  }
  // iOS specific styles
  const iosStyle: ViewStyle = {
    padding: 20,
    gap: 20,
    borderRadius: 32,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  }

  return (
    <BlurView intensity={80} style={iosStyle}>
      <Content />
    </BlurView>
  )
}

function Content() {
  const theme = useColorScheme() ?? 'light'
  const { mutate: createGroup, isPending } = useCreateNewGroup()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewGroupForm>({
    defaultValues: {
      groupName: '',
    },
  })

  const onSubmit = (data: NewGroupForm) => {
    createGroup({ groupName: data.groupName })
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View>
        <View style={{ marginBottom: 10 }}>
          <UIText type="largeTitle">Create New Group</UIText>
        </View>
        <View>
          <UIText type="body" color="secondaryLabel">
            Create a group to start swiping with your friends
          </UIText>
        </View>
      </View>
      <View>
        <View style={{ marginBottom: 8, marginLeft: 12 }}>
          <UIText type="calloutEmphasized">Group Name</UIText>
        </View>
        <Controller
          control={control}
          name="groupName"
          rules={{ required: 'Group name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: colors[theme].material,
                  color: colors[theme].label,
                },
              ]}
              placeholder="Ex. Sea Food Diet"
              placeholderTextColor={colors[theme].secondaryLabel}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.groupName && (
          <View style={{ marginTop: 4 }}>
            <UIText type="caption" color="danger">
              {errors.groupName.message || 'Group name is required'}
            </UIText>
          </View>
        )}
      </View>
      <View style={styles.bottomButton}>
        <PrimaryButton
          type="primary"
          textType="bodyEmphasized"
          text={isPending ? 'Creating...' : 'Create Group'}
          onPress={handleSubmit(onSubmit)}
          isLoading={isPending}
          style={{ borderRadius: 12 }}
        />
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  bottomButton: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
})
